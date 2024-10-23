/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';

function QuestionTimer({ timeout, onTimeout, mode }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  // NOTE: also wrap this into useEffect() to avoid re-create timeout in every render.
  useEffect(() => {
    console.log('SETTING TIMEOUT');
    const timer = setTimeout(onTimeout, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [timeout, onTimeout]);

  useEffect(() => {
    // NOTE: useEffect() to prevent infinite loop
    console.log('SETTING INTERVAL');

    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <progress
      id='question-time'
      max={timeout}
      value={remainingTime}
      className={mode}
    />
  );
}

export default QuestionTimer;
