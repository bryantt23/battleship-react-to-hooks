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
  constructor() {
    super();
    this.state = {
      cheat: false,
      playerAttackedPositions: arr,
      computerAttackedPositions: arr,
      playerBoard: [],
      computerBoard: []
    };
  }

  componentDidMount() {
    const g = new GameEngine();
    g.startGame();
    const playerGameBoard = g.playerGameboard.getBoard();
    // const playerBoardUi = this.renderBoard(g.playerGameboard, 'player');
    // console.log(g.playerGameboard);
    console.log(g.computerGameboard.getBoard());
    // console.log(g.playerGameboard);
    console.log(g.playerGameboard.getBoard());

    this.setState({
      playerBoard: [...g.computerGameboard.getBoard()],
      computerBoard: [...g.playerGameboard.getBoard()]
    });
  }
  /*
plan
first render my board with ships
next render computer board with sea

need to think about how to deal with onclick and state
i can render a component for every element in the array
the component can get the state from the array, hit, miss, sea

what is the source of truth?
the source of truth comes from the game board
the game board has all of the information i need
including if all ships have been sunk

how to render based on that?
maybe the component can render on the gameboard having the state of ship, hit, miss
if it has ship it should be the sea 
if it is hit or miss then it should render that
how to deal with onclick?
if it is hit or miss then it doesn't need an onclick or it can be disabled

maybe i'll just render it first
each position will store its row & col with a call back
i'll take it from there
or maybe each component and have its own state passed from props that makes it decide what to render
and if it's hit or miss i'll just disable the component
i'll try this

but first render and take in row & col & print that

i'll render my board first with the ships showing

then i'll deal with the computer board
which is just a bunch of SEA stuff
later create a cheat board to see the computer's board


plan again
will use app state to track which parts have been attacked
will start with the computer board
then later work on player board




*/
  testFunction(i, j, gameBoard, board) {
    console.log(gameBoard[i][j]);
    this.renderBoard(board);
  }

  // renderBoard(board) {
  //   const gameBoard = board.getBoard();
  //   console.log(gameBoard);

  //   const dom = [];
  //   let length = gameBoard.length;
  //   for (let i = 0; i < length; i++) {
  //     let arr = [];
  //     for (let j = 0; j < length; j++) {
  //       const val = gameBoard[i][j];
  //       console.log(val);
  //       arr.push(
  //         <BoardSection
  //           boardState={gameBoard[i][j]}
  //           getLocation={() => {
  //             console.log(i + ' ' + j);
  //             console.log(board.receiveAttack(i, j));
  //             console.log(gameBoard[i][j]);
  //             this.testFunction(i, j, gameBoard, board);
  //           }}
  //         />
  //       );
  //     }
  //     const div = <tr>{arr}</tr>;
  //     dom.push(div);
  //   }
  //   console.log(dom);
  //   return dom;
  // }

  // renderBoard(board, player) {
  //   const gameBoard = board.getBoard();
  //   console.log(gameBoard);

  //   const dom = [];
  //   let length = gameBoard.length;
  //   for (let i = 0; i < length; i++) {
  //     let arr = [];
  //     for (let j = 0; j < length; j++) {
  //       const val = gameBoard[i][j];
  //       console.log(val);
  //       arr.push(
  //         <BoardSection
  //           boardState={gameBoard[i][j]}
  //           getLocation={() => {
  //             console.log(i + ' ' + j);
  //             console.log(board.receiveAttack(i, j));
  //             console.log(gameBoard[i][j]);
  //             this.testFunction(i, j, gameBoard, board);
  //           }}
  //         />
  //       );
  //     }
  //     const div = <tr>{arr}</tr>;
  //     dom.push(div);
  //   }
  //   console.log(dom);
  //   return dom;
  // }

  copyArr(computer, player) {
    console.log(computer + ' ' + player);
    this.setState({
      playerBoard: [...computer],
      computerBoard: [...player]
    });
  }

  updateBoardSectionState(i, j, board) {
    //should be true if it's false my disabled is broken
    const attacked = this.state.playerAttackedPositions;
    const boardState = this.state[board];
    if (boardState[i][j] === undefined) {
      //miss
      boardState[i][j] = 'MISS';
    } else {
      //hit
      boardState[i][j] = 'HIT';
    }
    attacked[i][j] = true;
    this.setState({
      playerAttackedPositions: attacked,
      [board]: boardState
    });
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
            updateBoardSectionState={() => {
              this.updateBoardSectionState(i, j, 'playerBoard');
              // console.log(i + ' ' + j);
              // console.log(board.receiveAttack(i, j));
              // console.log(gameBoard[i][j]);
              // this.testFunction(i, j, gameBoard, board);
            }}
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
            getLocation={() => {
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
