import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileText, Loader2 } from 'lucide-react';

export default function UploadSection({ onGenerate, loading }) {
  const [activeTab, setActiveTab] = useState('document');
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [numQuestions, setNumQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState('medium');

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1
  });

  const handleSubmit = () => {
    if (activeTab === 'document' && file) {
      onGenerate(file, null, numQuestions, difficulty);
    } else if (activeTab === 'text' && text.trim()) {
      onGenerate(null, text, numQuestions, difficulty);
    }
  };

  const isSubmitDisabled = loading || (activeTab === 'document' ? !file : !text.trim());

  return (
    <div className="card">
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'document' ? 'active' : ''}`}
          onClick={() => setActiveTab('document')}
        >
          Document
        </button>
        <button 
          className={`tab ${activeTab === 'text' ? 'active' : ''}`}
          onClick={() => setActiveTab('text')}
        >
          Text
        </button>
      </div>

      <div style={{ marginTop: '24px' }}>
        {activeTab === 'document' ? (
          <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
            <input {...getInputProps()} />
            <UploadCloud className="dropzone-icon" size={48} />
            {file ? (
              <p style={{ fontWeight: 500 }}>{file.name}</p>
            ) : (
              <p>Drag a PDF document here, or click to browse</p>
            )}
          </div>
        ) : (
          <div className="textarea-container">
            <textarea 
              placeholder="Paste your notes or text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        )}
      </div>

      <div className="quiz-settings">
        <div className="setting-item">
          <label>Questions</label>
          <input 
            type="number" 
            min="1" 
            max="15" 
            value={numQuestions} 
            onChange={(e) => setNumQuestions(e.target.value)}
          />
        </div>
        <div className="setting-item">
          <label>Difficulty</label>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>

      <div style={{ marginTop: '24px', textAlign: 'center' }}>
        <button 
          className="btn btn-primary" 
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
        >
          {loading ? (
            <>
              <Loader2 className="spinner" size={18} style={{ marginRight: '8px' }} />
              Generating...
            </>
          ) : (
            'Generate Quiz'
          )}
        </button>
      </div>
    </div>
  );
}

