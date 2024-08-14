import React, { useState, useCallback, useRef } from 'react';

interface GameOfLifeProps {
  gridSize?: number;
}

const GameOfLife: React.FC<GameOfLifeProps> = ({ gridSize = 50 }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < gridSize; i++) {
      rows.push(Array.from(Array(gridSize), () => Math.random() > 0.7 ? 1 : 0));
    }
    return rows;
  });

  const nextStep = useCallback(() => {
    setGrid(prevGrid => {
      return prevGrid.map((row, i) =>
        row.map((cell, j) => {
          const neighbors = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1], [1, 0], [1, 1]
          ].reduce((acc, [x, y]) => {
            const newI = i + x;
            const newJ = j + y;
            if (newI >= 0 && newI < gridSize && newJ >= 0 && newJ < gridSize) {
              acc += prevGrid[newI][newJ];
            }
            return acc;
          }, 0);

          if (cell === 1 && (neighbors < 2 || neighbors > 3)) return 0;
          if (cell === 0 && neighbors === 3) return 1;
          return cell;
        })
      );
    });
  }, [gridSize]);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => {
      if (prev) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      } else {
        timerRef.current = setInterval(() => {
          setGrid(prevGrid => {
            return prevGrid.map((row, i) =>
              row.map((cell, j) => {
                const neighbors = [
                  [-1, -1], [-1, 0], [-1, 1],
                  [0, -1],           [0, 1],
                  [1, -1], [1, 0], [1, 1]
                ].reduce((acc, [x, y]) => {
                  const newI = i + x;
                  const newJ = j + y;
                  if (newI >= 0 && newI < gridSize && newJ >= 0 && newJ < gridSize) {
                    acc += prevGrid[newI][newJ];
                  }
                  return acc;
                }, 0);

                if (cell === 1 && (neighbors < 2 || neighbors > 3)) return 0;
                if (cell === 0 && neighbors === 3) return 1;
                return cell;
              })
            );
          });
        }, 100);
      }
      return !prev;
    });
  }, [gridSize]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridSize}, 20px)`, justifyContent: 'center' }}>
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
      <div style={{ marginTop: '20px' }}>
        <button onClick={nextStep} style={{ marginRight: '10px' }}>Next Step</button>
        <button onClick={togglePlay}>{isPlaying ? 'Stop' : 'Play'}</button>
      </div>
    </div>
  );
};

export default GameOfLife;