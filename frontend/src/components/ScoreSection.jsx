import { RotateCcw, Play, Star } from 'lucide-react';

export default function ScoreSection({ score, total, bestScore, onReset, onRestart }) {
  const percentage = Math.round((score / total) * 100);
  
  let message = "";
  if (percentage === 100) message = "Perfect! Outstanding job!";
  else if (percentage >= 80) message = "Great work! You really know this material.";
  else if (percentage >= 60) message = "Good job! A little more review and you'll master it.";
  else message = "Keep studying! Review the material and try again.";

  return (
    <div className="card score-section">
      <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Quiz Completed!</h2>
      
      <div className="score-display">
        {score} / {total}
      </div>

      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        gap: '8px',
        margin: '-10px 0 24px 0',
        color: 'var(--accent)',
        fontWeight: 600,
        fontSize: '0.9rem'
      }}>
        <Star size={16} fill="var(--accent)" />
        BEST SCORE: {bestScore} / {total}
      </div>
      
      <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '32px' }}>
        {message}
      </p>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <button className="btn btn-secondary" onClick={onRestart}>
          <RotateCcw size={18} style={{ marginRight: '8px' }} />
          Retake Quiz
        </button>
        <button className="btn btn-primary" onClick={onReset}>
          <Play size={18} style={{ marginRight: '8px' }} />
          New Material
        </button>
      </div>
    </div>
  );
}

