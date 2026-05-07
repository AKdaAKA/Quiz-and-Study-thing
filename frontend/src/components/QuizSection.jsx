import { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

export default function QuizSection({ questions, onEnd }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleOptionClick = (index) => {
    if (hasAnswered) return;
    
    setSelectedOptionIndex(index);
    setHasAnswered(true);

    if (currentQuestion.options[index].isCorrect) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(curr => curr + 1);
      setSelectedOptionIndex(null);
      setHasAnswered(false);
    } else {
      onEnd(score);
    }
  };

  return (
    <div className="card">
      <div className="quiz-header">
        <h2 style={{ fontSize: '1.25rem' }}>Question {currentIndex + 1}</h2>
        <div className="question-counter">
          {currentIndex + 1} / {questions.length}
        </div>
      </div>

      <div className="question-text">
        {currentQuestion.question}
      </div>

      <div className="options-list">
        {currentQuestion.options.map((option, index) => {
          let btnClass = 'option-btn';
          
          if (hasAnswered) {
            if (index === selectedOptionIndex) {
              btnClass += option.isCorrect ? ' selected correct' : ' selected wrong';
            } else if (option.isCorrect) {
              btnClass += ' unselected correct';
            }
          }

          return (
            <button 
              key={index} 
              className={btnClass}
              onClick={() => handleOptionClick(index)}
              disabled={hasAnswered}
            >
              <span>{option.text}</span>
              {hasAnswered && index === selectedOptionIndex && (
                option.isCorrect ? <CheckCircle2 size={20} /> : <XCircle size={20} />
              )}
              {hasAnswered && index !== selectedOptionIndex && option.isCorrect && (
                <CheckCircle2 size={20} />
              )}
            </button>
          );
        })}
      </div>

      {hasAnswered && (
        <div className={`reason-box ${currentQuestion.options[selectedOptionIndex].isCorrect ? 'correct' : 'wrong'}`}>
          <p style={{ fontWeight: 600, marginBottom: '8px' }}>
            {currentQuestion.options[selectedOptionIndex].isCorrect ? 'Correct!' : 'Incorrect'}
          </p>
          <p>{currentQuestion.options[selectedOptionIndex].reason}</p>
        </div>
      )}

      {hasAnswered && (
        <div style={{ marginTop: '24px', textAlign: 'right' }}>
          <button className="btn btn-primary" onClick={handleNext}>
            {currentIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            <ArrowRight size={18} style={{ marginLeft: '8px' }} />
          </button>
        </div>
      )}
    </div>
  );
}
