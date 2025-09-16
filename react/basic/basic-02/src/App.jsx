import { useState } from 'react';
import { Player } from './components/Player';
import { GameBoard } from './components/GameBoard';
import { Log } from './components/Log';
import { WINNING_COMBINATIONS } from './winning-combinations';

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2',
};
const INIT_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveCurPlayer(turns) {
  return turns[0]?.player === 'X' ? 'O' : 'X';
}

function deriveWinner(gameBoard, players) {
  let winner = null;
  for (const i of WINNING_COMBINATIONS) {
    const firstSym = gameBoard[i[0].row][i[0].column];
    const secondSym = gameBoard[i[1].row][i[1].column];
    const thirdSym = gameBoard[i[2].row][i[2].column];
    if (firstSym && firstSym === secondSym && firstSym === thirdSym)
      winner = players[firstSym];
  }
  return winner;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INIT_GAME_BOARD.map((arr) => [...arr])];
  for (const turn of gameTurns) {
    const {
      square: { row, col },
      player,
    } = turn;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

export default function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);

  let activePlayer = deriveCurPlayer(gameTurns);
  let gameBoard = deriveGameBoard(gameTurns);
  let winner = deriveWinner(gameBoard, players);
  let hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((s) => {
      return [
        {
          square: { row: rowIndex, col: colIndex },
          player: deriveCurPlayer(s),
        },
        ...s,
      ];
    });
  }

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <Player
            initialName={PLAYERS.X}
            symbol='X'
            isActive={activePlayer === 'X'}
            onSetName={setPlayers}
          />
          <Player
            initialName={PLAYERS.O}
            symbol='O'
            isActive={activePlayer === 'O'}
            onSetName={setPlayers}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onReset={setGameTurns} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} gameBoard={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

function GameOver({ winner, onReset }) {
  return (
    <div id='game-over'>
      <h2>Game Over</h2>
      {winner && <p>{winner} won!</p>}
      {!winner && <p>DRAW</p>}
      <p>
        <button onClick={() => onReset([])}>Rematch</button>
      </p>
    </div>
  );
}
