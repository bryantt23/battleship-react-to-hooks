import { Component } from 'react';
import './App.css';
import GameEngine from './components/GameEngine';
import BoardSection from './components/BoardSection';

const boardSize = 10;

let arr = [];
for (let i = 0; i < boardSize; i++) {
  arr.push(new Array(boardSize));
}

class App extends Component {
  gameEngine;
  playerBoard;
  computerBoard;

  constructor() {
    super();
    this.state = {
      cheat: false,
      playerAttackedPositions: arr,
      computerAttackedPositions: arr,
      playerBoard: [],
      computerBoard: [],
      allShipsSunk: false,
      winner: null,
      isPlayerTurn: true
    };
  }

  componentDidMount() {
    this.gameEngine = new GameEngine();
    this.gameEngine.startGame();
    this.playerBoard = this.gameEngine.playerGameboard;
    this.computerBoard = this.gameEngine.computerGameboard;
    // const playerBoardUi = this.renderBoard(g.playerGameboard, 'player');
    // console.log(g.playerGameboard);
    console.log(this.gameEngine.computerGameboard.getBoard());
    // console.log(g.playerGameboard);
    console.log(this.gameEngine.playerGameboard.getBoard());

    this.setState({
      playerBoard: [...this.gameEngine.playerGameboard.getBoard()],
      computerBoard: [...this.gameEngine.computerGameboard.getBoard()]
    });

    // if (!this.state.winner) {
    //   if (!this.state.isPlayerTurn) {
    //     if (
    //       !this.gameEngine.computer.makePlay(
    //         this.gameEngine.computerGameboard,
    //         'computer',
    //         'computer'
    //       )
    //     )
    //       this.setState({ isPlayerTurn: true });
    //   } else {
    //   }
    // }
  }

  computerMove() {
    const [i, j] = this.gameEngine.computer.makePlay(this.playerBoard);

    const attackedBoard = [...this.state.playerAttackedPositions];

    if (this.computerBoard.isValidAttack(i, j, attackedBoard)) {
      console.log('valid computer move');

      const boardState = this.state.playerBoard;
      const [
        updatedBoardState,
        updatedAttackBoard
      ] = this.playerBoard.receiveAttack(i, j, boardState, attackedBoard);

      //use this & board to determine winner

      console.log('all sunk', this.playerBoard.allShipsSunk());
      const allShipsSunk = this.playerBoard.allShipsSunk();
      if (allShipsSunk) {
        let winner;
        // if (board === 'playerBoard') {
        winner = 'computer wins!';
        // } else {
        //   winner = 'Computer wins!';
        // }
        this.setState({
          allShipsSunk: true,
          winner: winner
        });
        return;
      }

      this.setState({
        playerAttackedPositions: updatedAttackBoard,
        playerBoard: updatedBoardState,
        isPlayerTurn: true
      });
    } else {
      console.log('invalid computer move');
      this.computerMove();
    }
  }

  //player move
  // can change this, only the player uses this function
  //computerBoard argument
  updateBoardSectionState(i, j, board) {
    // move this into object
    // delegate this stuff into receive attack

    let attackedProperty;
    // if (board === 'playerBoard') {
    //   attackedProperty = 'playerAttackedPositions';
    // } else {
    attackedProperty = 'computerAttackedPositions';
    // }

    const attackedBoard = this.state[attackedProperty];

    if (this[board].isValidAttack(i, j, attackedBoard)) {
      console.log('valid move');
      const boardState = this.state[board];
      const [updatedBoardState, updatedAttackBoard] = this[board].receiveAttack(
        i,
        j,
        boardState,
        attackedBoard
      );

      //use this & board to determine winner

      console.log('all sunk', this[board].allShipsSunk());
      const allShipsSunk = this[board].allShipsSunk();
      if (allShipsSunk) {
        let winner;
        // if (board === 'playerBoard') {
        winner = 'Player wins!';
        // } else {
        //   winner = 'Computer wins!';
        // }
        this.setState({
          allShipsSunk: true,
          winner: winner
        });
        return;
      }

      this.setState(
        {
          computerAttackedPositions: updatedAttackBoard,
          [board]: updatedBoardState,
          isPlayerTurn: !this.state.isPlayerTurn
        },
        () => {
          this.computerMove();
        }
      );
    } else {
      console.log('invalid move');
    }
  }

  renderPlayerUi() {
    const dom = [];
    let length = this.state.playerBoard.length;
    for (let i = 0; i < length; i++) {
      let arr = [];
      for (let j = 0; j < length; j++) {
        arr.push(
          //attacked, not attacked
          //attacked can be hit or miss
          //not attacked will just be the ship or sea
          <BoardSection
            attacked={this.state.playerAttackedPositions[i][j]}
            status={this.state.playerBoard[i][j]}
            updateBoardSectionState={() => {}}
          />
        );
      }
      const div = <tr>{arr}</tr>;
      dom.push(div);
    }
    console.log(dom);
    return dom;
  }

  //basically same function as renderPlayerUi
  renderComputerUi() {
    const dom = [];
    let length = this.state.computerBoard.length;
    for (let i = 0; i < length; i++) {
      let arr = [];
      for (let j = 0; j < length; j++) {
        arr.push(
          <BoardSection
            isComputer={true}
            attacked={this.state.computerAttackedPositions[i][j]}
            status={this.state.computerBoard[i][j]}
            updateBoardSectionState={() => {
              this.updateBoardSectionState(i, j, 'computerBoard');
            }}
          />
        );
      }
      const div = <tr>{arr}</tr>;
      dom.push(div);
    }
    return dom;
  }

  render() {
    // const g = new GameEngine();

    // g.startGame();
    // console.log(g.playerGameboard);
    // console.log(g.computerGameboard.getBoard());
    // const playerGameBoard = g.playerBoard.getBoard();
    const playerBoardUi = this.renderPlayerUi();
    const computerBoardUi = this.renderComputerUi();

    // const computerBoard = g.computerBoard.getBoard();
    // const computerBoardUi = this.renderBoard(g.computerGameboard, 'computer');
    // this.copyArr(g.computerGameboard.getBoard(), g.playerGameboard.getBoard());

    return (
      <div className='App'>
        {JSON.stringify(this.state)}
        <h3>Player Board</h3>
        {/* {JSON.stringify(this.state.playerBoard)} */}
        {playerBoardUi}
        <h3>Computer Board</h3>
        {computerBoardUi}
        <br />
        <button
          onClick={() => {
            this.setState({ cheat: !this.state.cheat });
          }}
        >
          {this.state.cheat ? 'Hide ' : 'Show '} computer's ships{' '}
        </button>
        {/* {this.state.cheat && computerBoardUi} */}
      </div>
    );
  }
}

export default App;
