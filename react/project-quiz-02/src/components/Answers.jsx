/* eslint-disable react/prop-types */

import { useRef } from 'react';

function Answers({ answers, selectedAnswer, answerState, onSelect }) {
  // NOTE: useRef() to avoid shuffle when answerState is changed
  const shuffledAnswers = useRef();

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5); // NOTE: a common pattern to suffle list
  }
  return (
    <ul id='answers'>
      {shuffledAnswers.current.map((answer) => {
        const isSelected = selectedAnswer === answer;
        let cssClasses = '';
        if (answerState === 'answered' && isSelected) cssClasses = 'selected';
        if (
          (answerState === 'correct' || answerState === 'wrong') &&
          isSelected
        )
          cssClasses = answerState;

        return (
          <li key={answer} className='answer'>
            <button
              onClick={() => onSelect(answer)}
              className={cssClasses}
              disabled={answerState !== ''}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default Answers;
