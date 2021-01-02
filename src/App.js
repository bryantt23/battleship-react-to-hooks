import { Component } from 'react';
import './App.css';
import GameEngine from './components/GameEngine';

class App extends Component {
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




*/

  render() {
    let g = new GameEngine();
    g.startGame();

    return <div className='App'>hii</div>;
  }
}

export default App;
