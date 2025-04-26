import { useState } from 'react';
import { Header } from './components/Header';
import { UserInputGroup } from './components/UserInputGroup.jsx';
import { Results } from './components/Results.jsx';

export const DATA = [
  { name: 'initialInvestment', display: 'Initial Investment', init: 10000 },
  { name: 'annualInvestment', display: 'Annual Investment', init: 1200 },
  { name: 'expectedReturn', display: 'Expected Return', init: 6 },
  { name: 'duration', display: 'Duration', init: 10 },
];

export function App() {
  /* comma operator: the comma operator allows you to include multiple expressions in a single line, evaluating each one from left to right, and returning the last value. */
  const [userInput, setUserInput] = useState(
    DATA.reduce((acc, cur) => ((acc[cur.name] = cur.init), acc), {}),
  );
  const inputIsValid = userInput.duration >= 1;

  function handleChange(identifier, value) {
    setUserInput((s) => ({ ...s, [identifier]: +value }));
  }

  return (
    <>
      <Header />
      <UserInputGroup userInput={userInput} onChange={handleChange} />
      {!inputIsValid && (
        <p className='center'>Duration needs to be greater than 0.</p>
      )}
      {inputIsValid && <Results userInput={userInput} />}
    </>
  );
}
