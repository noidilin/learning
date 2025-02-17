/* eslint-disable react/prop-types */

/**
 * - [x] for the current move only, show 'you are at move # ' instead of a button.
 * - [x] rewrite `Board` to use two loops to make the squares instead of hardcoding them.
 * - [x] add a toggle button that lets you sort the moves in either ascending or descending order.
 * - [x] when someone wins, highlight the three squares that caused the win.
 * - [x] when no one wins, display a message about the result being a draw.
 * - [x] display the location for each move in the format (row, col) in the move history list.
 */

import { useState } from 'react';

function Game() {
  // history initiated with an array that contains a single item, which itself is an array of 9 `null`.
  // each item will snapshot the square in each move
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [record, setRecord] = useState([[0, 0]]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);

  const xIsNext = currentMove % 2 === 0;
  const isEnd = currentMove === 9;
  const currentSquares = history[currentMove];

  function handleSort() {
    setIsAscending(!isAscending);
  }

  function handlePlay(nextSquares, i) {
    const row = Math.floor(i / 3) + 1;
    const col = (i % 3) + 1;
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    const nextRecord = [...record.slice(0, currentMove + 1), [row, col]];

    setHistory(nextHistory);
    setRecord(nextRecord);
    setCurrentMove(nextHistory.length - 1);
  }

  return (
    <div className='game'>
      <div className='game-board'>
        <Board
          xIsNext={xIsNext}
          isEnd={isEnd}
          squares={currentSquares}
          onPlay={handlePlay}
        />
      </div>
      <div className='game-info'>
        <button onClick={handleSort}>
          {isAscending ? 'Sort Descending' : 'Sort Ascending'}
        </button>
        <ol>
          {[...Array(history.length)].map((_, index) => {
            // sorting method won't change how many item we should display (history.length)
            // we can use the index to generate ascending and descending number
            const move = isAscending ? index : history.length - 1 - index;

            // the displaying move button is where user want to visit,
            // and the number move will be use to set currentMove
            return (
              <li key={move}>
                <button onClick={() => setCurrentMove(move)}>
                  {move === 0 && `go to game start`}
                  {move > 0 &&
                    move === currentMove &&
                    `you're at move # ${move} - rol: ${record[move][0]}, col: ${record[move][1]} `}
                  {move > 0 &&
                    move !== currentMove &&
                    `go to move # ${move} - rol: ${record[move][0]}, col: ${record[move][1]} `}
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

function Board({ xIsNext, isEnd, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calResult(squares)) return;

    const nextSquares = squares.slice();
    if (xIsNext) nextSquares[i] = 'X';
    else nextSquares[i] = 'O';

    onPlay(nextSquares, i);
  }

  return (
    <>
      <div className='status'>
        {calResult(squares) && `Winner: ${calResult(squares).winner}`}
        {!calResult(squares) && !isEnd && `Next: ${xIsNext ? 'X' : 'O'}`}
        {!calResult(squares) && isEnd && `Game draw`}
      </div>
      {[0, 1, 2].map((row) => (
        <div key={row} className='board-row'>
          {[0, 1, 2].map((col) => {
            // calculate the square index. converts 2D coordinates into 1D array index
            const index = row * 3 + col;
            return (
              <Square
                key={index}
                value={squares[index]}
                highlight={calResult(squares)?.line.includes(index)}
                onSquareClick={() => handleClick(index)}
              />
            );
          })}
        </div>
      ))}
    </>
  );
}

function Square({ value, onSquareClick, highlight }) {
  return (
    <button
      onClick={onSquareClick}
      className={highlight ? 'square bg-emerald-300 text-emerald-50' : 'square'}
    >
      {value}
    </button>
  );
}

function App() {
  return <Game />;
}

function calResult(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  return null;
}

export default App;
