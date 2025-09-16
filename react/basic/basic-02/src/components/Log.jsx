export function Log({ turns }) {
  return (
    <ol id='log'>
      {turns.map((c) => (
        <li key={`${c.square.row}-${c.square.col}`}>
          {c.player} selected {c.square.row}, {c.square.col}
        </li>
      ))}
    </ol>
  );
}
