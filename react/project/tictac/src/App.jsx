/* eslint-disable react/prop-types */

/* improvement: separate file for constants and hooks, and remove magic number */

import { BOARD_SIZE, WINNING_LINES } from './constants';
import { useGame } from './hooks/useGame';

function Game() {
  const {
    history,
    record,
    currentMove,
    isAscending,
    xIsNext,
    isEnd,
    currentSquares,
    handleSort,
    handlePlay,
    setCurrentMove,
  } = useGame();

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
      {[...Array(BOARD_SIZE)].map((_, row) => (
        <div key={row} className='board-row'>
          {[...Array(BOARD_SIZE)].map((_, col) => {
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
  for (const [a, b, c] of WINNING_LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

export default App;
