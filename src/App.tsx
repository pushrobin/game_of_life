import React from 'react';
import GameOfLife from './components/GameOfLife';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Game of Life</h1>
      <GameOfLife />
    </div>
  );
};

export default App;