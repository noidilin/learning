/* eslint-disable react/prop-types */

import { useQuiz } from '../contexts/QuizContext';

function Options({ question }) {
  const { dispatch, answer } = useQuiz();
  const hasAnswered = answer !== null;

  return (
    <div className='options'>
      {question.options.map((opt, i) => (
        <button
          className={`
            btn btn-option ${i === answer ? 'answer' : ''} ${
              hasAnswered
                ? i === question.correctOption
                  ? 'correct'
                  : 'wrong'
                : ''
            }`}
          key={opt}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: 'newAnswer', payload: i })}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export default Options;
