/* eslint-disable react/prop-types */

import { useState, useEffect } from 'react';

function ProgressBar({ timer }) {
  const [remainingTime, setRemainingTime] = useState(timer);

  useEffect(() => {
    const interval = setInterval(
      () => setRemainingTime((prev) => prev - 100),
      100,
    );
    return () => {
      clearInterval(interval);
    };
  }, []);
  return <progress value={remainingTime} max={timer} />;
}

export default ProgressBar;
