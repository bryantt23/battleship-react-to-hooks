import { useState, useEffect } from 'react';
import './App.css';
import GameEngine from './components/GameEngine';
import BoardSection from './components/BoardSection';

const boardSize = 5;
const gameEngine = new GameEngine(boardSize);
gameEngine.startGame();
console.log('🚀 ~ file: App.js:9 ~ gameEngine', gameEngine);

let arr = [];
for (let i = 0; i < boardSize; i++) {
  arr.push(new Array(boardSize));
}
let arr2 = JSON.parse(JSON.stringify(arr));

function App() {
  const [computerBoard, setComputerBoard] = useState();
  const [playerBoard, setPlayerBoard] = useState(
    gameEngine.playerGameboard.getBoard()
  );
  const [playerBoardInstance, setPlayerBoardInstance] = useState(
    gameEngine.playerGameboard
  );
  const [
    playerPositionsThatHaveBeenAttacked,
    setPlayerPositionsThatHaveBeenAttacked
  ] = useState(arr);

  const renderPlayerUi = () => {
    const dom = [];
    for (let i = 0; i < boardSize; i++) {
      let arr = [];
      for (let j = 0; j < boardSize; j++) {
        arr.push(
          //attacked, not attacked
          //attacked can be hit or miss
          //not attacked will just be the ship or sea
          <BoardSection
            attacked={playerPositionsThatHaveBeenAttacked[i][j]}
            status={playerBoard[i][j]}
            updateBoardSectionState={() => {}}
          />
        );
      }
      const div = <tr>{arr}</tr>;
      dom.push(div);
    }
    console.log(dom);
    return dom;
  };
  return (
    <div className='App'>
      <h1>Battleship</h1>
      {/* <div disabled={this.state.winner !== null} id='gameboard'> */}
      <h3>Player Board</h3>
      {renderPlayerUi()}
      <h3>Computer Board</h3>
      {/* {computerBoardUi} */}
      <br />
    </div>
    // {this.state.disabled ? <h2>{this.state.winner}</h2> : ''}
    // <button
    //   onClick={() => {
    //     this.setState({ cheat: !this.state.cheat });
    //   }}
    // >
    //   {this.state.cheat ? 'Hide ' : 'Show '} computer's ships{' '}
    // </button>
    // {this.state.cheat && computerBoardUiCheat}
    // </div>
  );
}

export default App;
