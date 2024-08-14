import React from 'react';
import GameOfLife from './components/GameOfLife';

const App: React.FC = () => {
  const githubBadgeStyle = {
    position: 'absolute' as 'absolute',
    top: '10px',
    right: '10px',
    padding: '5px 10px',
    backgroundColor: '#24292e',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
  };
  return (
    <div className="App">
      <a href="https://github.com/pushrobin/game_of_life" target="_blank" rel="noopener noreferrer" style={githubBadgeStyle}>
        View on GitHub
      </a>
      <GameOfLife />
    </div>
  );
};

export default App;