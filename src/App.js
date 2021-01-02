import { Component } from 'react';
import './App.css';
import GameEngine from './components/GameEngine';
import BoardSection from './components/BoardSection';

class App extends Component {
  constructor() {
    super();
    this.state = { cheat: false };
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






*/

  renderPlayerGameBoard(playerGameBoard) {
    const dom = [];
    let length = playerGameBoard.length;
    for (let i = 0; i < length; i++) {
      let arr = [];
      for (let j = 0; j < length; j++) {
        const val = playerGameBoard[i][j];
        console.log(val);
        arr.push(
          <BoardSection
            boardState={playerGameBoard[i][j]}
            getLocation={() => {
              console.log(i + ' ' + j);
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
    const g = new GameEngine();
    g.startGame();
    console.log(g.playerGameboard.getBoard());
    console.log(g.computerGameboard.getBoard());
    const playerGameBoard = g.playerGameboard.getBoard();
    const playerGameBoardUi = this.renderPlayerGameBoard(playerGameBoard);

    const computerGameBoard = g.computerGameboard.getBoard();
    const computerGameBoardUi = this.renderPlayerGameBoard(computerGameBoard);

    return (
      <div className='App'>
        <h3>Player Board</h3>
        {playerGameBoardUi}
        <h3>Computer Board</h3>
        <br />
        <button
          onClick={() => {
            this.setState({ cheat: !this.state.cheat });
          }}
        >
          {this.state.cheat ? 'Hide ' : 'Show '} computer's ships{' '}
        </button>
        {this.state.cheat && computerGameBoardUi}
      </div>
    );
  }
}

export default App;
