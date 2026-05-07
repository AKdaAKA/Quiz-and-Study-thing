import { useState } from 'react';
import axios from 'axios';
import UploadSection from './components/UploadSection';
import QuizSection from './components/QuizSection';
import ScoreSection from './components/ScoreSection';

function App() {
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    return parseInt(localStorage.getItem('quiz_best_score')) || 0;
  });

  const handleGenerate = async (file, text, numQuestions, difficulty) => {
    setLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      if (file) {
        formData.append('file', file);
        formData.append('numQuestions', numQuestions);
        formData.append('difficulty', difficulty);
      } else if (text) {
        // For text we send JSON
      }

      const response = await axios.post('/api/quiz/generate', file ? formData : {
        text,
        numQuestions,
        difficulty
      }, {
        headers: {
          'Content-Type': file ? 'multipart/form-data' : 'application/json'
        }
      });

      // Based on our Zod schema
      setQuizData(response.data.questions);
      setTotalQuestions(response.data.questions.length);
      setScore(0);
      setQuizFinished(false);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleQuizEnd = (finalScore) => {
    setScore(finalScore);
    setQuizFinished(true);
    
    if (finalScore > bestScore) {
      setBestScore(finalScore);
      localStorage.setItem('quiz_best_score', finalScore.toString());
    }
  };

  const resetApp = () => {
    setQuizData(null);
    setQuizFinished(false);
    setScore(0);
  };

  const restartQuiz = () => {
    // Fisher-Yates shuffle helper
    const shuffle = (array) => {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    };

    // Shuffle questions AND their options
    const shuffledData = shuffle(quizData).map(q => ({
      ...q,
      options: shuffle(q.options)
    }));

    setQuizData(shuffledData);
    setQuizFinished(false);
    setScore(0);
  };


  return (
    <div className="container">
      <header>
        <h1>AI Quiz Generator</h1>
        <p>Upload a document or paste your notes to automatically generate a quiz with AI.</p>
      </header>

      <main>
        {error && <div className="reason-box wrong" style={{marginBottom: 20}}>{error}</div>}

        {!quizData && !quizFinished && (
          <UploadSection onGenerate={handleGenerate} loading={loading} />
        )}

        {quizData && !quizFinished && (
          <QuizSection 
            questions={quizData} 
            onEnd={handleQuizEnd} 
          />
        )}

        {quizFinished && (
          <ScoreSection 
            score={score} 
            total={totalQuestions} 
            bestScore={bestScore}
            onReset={resetApp} 
            onRestart={restartQuiz}
          />
        )}
      </main>
    </div>

  );
}

export default App;
