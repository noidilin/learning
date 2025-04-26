import { useState } from 'react';

export function Player({ initialName, symbol, isActive, onSetName }) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleSetIsEditing() {
    setIsEditing((s) => !s);
    if (isEditing) onSetName((s) => ({ ...s, [symbol]: playerName }));
  }

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className='player'>
        {isEditing ? (
          <input
            type='text'
            required
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          ></input>
        ) : (
          <span className='player-name'>{playerName}</span>
        )}
        <span className='player-symbol'>{symbol}</span>
      </span>
      <button onClick={handleSetIsEditing}>
        {isEditing ? 'Save' : 'Edit'}
      </button>
    </li>
  );
}
