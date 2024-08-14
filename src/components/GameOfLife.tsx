import React, { useState } from 'react';

interface GameOfLifeProps {
  gridSize?: number;
}

const GameOfLife: React.FC<GameOfLifeProps> = ({ gridSize = 50 }) => {
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < gridSize; i++) {
      rows.push(Array.from(Array(gridSize), () => Math.random() > 0.7 ? 1 : 0));
    }
    return rows;
  });

  const nextStep = () => {
    const newGrid = grid.map((row, i) =>
      row.map((cell, j) => {
        const neighbors = [
          [-1, -1], [-1, 0], [-1, 1],
          [0, -1],           [0, 1],
          [1, -1], [1, 0], [1, 1]
        ].reduce((acc, [x, y]) => {
          const newI = i + x;
          const newJ = j + y;
          if (newI >= 0 && newI < gridSize && newJ >= 0 && newJ < gridSize) {
            acc += grid[newI][newJ];
          }
          return acc;
        }, 0);

        if (cell === 1 && (neighbors < 2 || neighbors > 3)) return 0;
        if (cell === 0 && neighbors === 3) return 1;
        return cell;
      })
    );
    setGrid(newGrid);
  };

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridSize}, 20px)` }}>
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][j] ? 'black' : 'white',
                border: '1px solid gray'
              }}
            />
          ))
        )}
      </div>
      <button onClick={nextStep}>Next Step</button>
    </div>
  );
};

export default GameOfLife;