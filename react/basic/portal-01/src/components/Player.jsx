import { useState, useRef } from 'react';

export function Player() {
  const inputName = useRef();
  const [playerName, setPlayerName] = useState(null);

  return (
    <section id='player'>
      <h2>Welcome {playerName ?? 'unknown entity'}</h2>
      <p>
        <input ref={inputName} type='text' />
        <button onClick={() => setPlayerName(inputName.current.value)}>
          Set Name
        </button>
      </p>
    </section>
  );
}
