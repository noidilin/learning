/* eslint-disable react/prop-types */

/**
 * - [x] for the current move only, show 'you are at move # ' instead of a button.
 * - [x] rewrite `Board` to use two loops to make the squares instead of hardcoding them.
 * - [ ] add a toggel button that lets you sort the moves in either ascending or descending order.
 * - [ ] when someone wins, highlight the three squares that caused the win.
 * - [ ] when no one wins, display a message about the result being a draw.
 * - [ ] display the location for each move in the format (row, col) in the move history list.
 */

import { useState } from 'react';

function Game() {
  // history intiated with an array that contains a single item, which itself is an array of 9 `null`.
  // each item will snapshot the square in each move
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  return (
    <div className='game'>
      <div className='game-board'>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className='game-info'>
        <ol>
          {history.map((_squares, move) => (
            <li key={move}>
              <button onClick={() => setCurrentMove(move)}>
                {move === 0 && `go to game start`}
                {move > 0 && move === currentMove && `you're at move # ${move}`}
                {move > 0 && move !== currentMove && `go to move # ${move}`}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();
    if (xIsNext) nextSquares[i] = 'X';
    else nextSquares[i] = 'O';

    onPlay(nextSquares);
  }

  return (
    <>
      <div className='status'>
        {calculateWinner(squares)
          ? `Winner: ${calculateWinner(squares)}`
          : `Next player: ${xIsNext ? 'X' : 'O'}`}
      </div>
      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function Square({ value, onSquareClick }) {
  return (
    <button className='square' onClick={onSquareClick}>
      {value}
    </button>
  );
}

function App() {
  return <Game />;
}

function calculateWinner(squares) {
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
      return squares[a];
    }
  }
  return null;
}

export default App;
