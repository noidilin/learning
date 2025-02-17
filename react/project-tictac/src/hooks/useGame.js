import { useState } from 'react';
import { BOARD_SIZE } from '../constants';

export function useGame() {
  const [history, setHistory] = useState([
    Array(BOARD_SIZE * BOARD_SIZE).fill(null),
  ]);
  const [record, setRecord] = useState([[0, 0]]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);

  const xIsNext = currentMove % 2 === 0;
  const isEnd = currentMove === BOARD_SIZE * BOARD_SIZE;
  const currentSquares = history[currentMove];

  const handleSort = () => setIsAscending(!isAscending);

  const handlePlay = (nextSquares, i) => {
    const row = Math.floor(i / BOARD_SIZE) + 1;
    const col = (i % BOARD_SIZE) + 1;
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    const nextRecord = [...record.slice(0, currentMove + 1), [row, col]];

    setHistory(nextHistory);
    setRecord(nextRecord);
    setCurrentMove(nextHistory.length - 1);
  };

  return {
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
  };
}
