import { useCallback, useState } from 'react';
import QUESTIONS from '../questions'; // NOTE: the first option from each question is the correct answer by design.
import Question from './Question';
import Summary from './Summary';

function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  // HACK: prevent the answer update immediately before the correct/ wrong answer is shown.
  const activeQuestionIndex = userAnswers.length; // NOTE: use the length of the user answers to derive current index.
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer,
  ) {
    setUserAnswers((prev) => [...prev, selectedAnswer]);
  }, []);

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer],
  );

  if (quizIsComplete) return <Summary userAnswers={userAnswers} />;

  return (
    <div id='quiz'>
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}

export default Quiz;
