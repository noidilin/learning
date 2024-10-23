/* eslint-disable react/prop-types */

import { useState } from 'react';

function SlowComponent() {
  // If this is too slow on your maching, reduce the `length`
  const words = Array.from({ length: 100_000 }, () => 'WORD');
  return (
    <ul>
      {words.map((word, i) => (
        <li key={i}>
          {i}: {word}
        </li>
      ))}
    </ul>
  );
}

// NOTE: pass slow component as a child to avoid wasted render
function Counter({ children }) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Slow counter?!?</h1>
      <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
      {children}
    </div>
  );
}

// NOTE: <SlowComponent/> needs to be created first, in order to be passed into <Counter/> as a child (prop).
// Therefore, it won't be affected by the state changes in the <Counter/> component.
export default function Test() {
  return (
    <Counter>
      <SlowComponent />
    </Counter>
  );
}
