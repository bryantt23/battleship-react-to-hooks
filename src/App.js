import './App.css';
import GameEngine from './components/GameEngine';

function App() {
  let g = new GameEngine();
  g.startGame();
  return <div className='App'>hii</div>;
}

export default App;
