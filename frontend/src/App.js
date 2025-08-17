import { useState } from 'react';
import './App.css';
import config from './config';
import ReactMarkdown from 'react-markdown';
import { 
  FiFileText, 
  FiSend, 
  FiEdit, 
  FiMail, 
  FiAlertCircle, 
  FiCheckCircle, 
  FiCpu, 
  FiLoader,
  FiEye,
  FiEyeOff
} from 'react-icons/fi';

function App() {
  const [transcript, setTranscript] = useState('');
  const [prompt, setPrompt] = useState('');
  const [summary, setSummary] = useState('');
  const [recipients, setRecipients] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  const handleTranscriptChange = (e) => {
    setTranscript(e.target.value);
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleRecipientsChange = (e) => {
    setRecipients(e.target.value);
  };

  const handleSummaryChange = (e) => {
    setSummary(e.target.value);
  };

  const handleGenerateSummary = async (e) => {
    e.preventDefault();
    
    if (!transcript) {
      setError('Please provide a transcript');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');
      setIsEditMode(false); // Reset edit mode when generating new summary
      
      const response = await fetch(`${config.apiUrl}/api/generate-summary`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transcript,
          prompt,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate summary');
      }

      const data = await response.json();
      setSummary(data.summary);
      setSuccess('Summary generated successfully!');
    } catch (error) {
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    
    if (!summary) {
      setError('Please generate a summary first');
      return;
    }

    if (!recipients) {
      setError('Please provide at least one recipient email');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      const recipientList = recipients.split(',').map(email => email.trim());
      
      const response = await fetch(`${config.apiUrl}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipients: recipientList,
          subject: 'Meeting Summary',
          summary,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        // Even if the request failed, we might have a summary in the response
        if (data && data.summary) {
          setSuccess('Email could not be sent, but your summary is saved.');
        } else {
          throw new Error(data.error || 'Failed to send email');
        }
      } else {
        setSuccess(data.message || 'Email sent successfully!');
      }
    } catch (error) {
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Briefly(AI Meeting Summarizer)</h1>
      </header>
      
      <main className="App-main">
        <section className="input-section">
          <div className="section-title">
            <FiFileText size={20} />
            <h2>Input Meeting Transcript</h2>
          </div>
          
          <form onSubmit={handleGenerateSummary}>
            <div className="form-group">
              <label htmlFor="transcript">Meeting Transcript:</label>
              <textarea
                id="transcript"
                value={transcript}
                onChange={handleTranscriptChange}
                placeholder="Paste your meeting transcript here..."
                rows="8"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="prompt">Custom Instruction (optional):</label>
              <input
                type="text"
                id="prompt"
                value={prompt}
                onChange={handlePromptChange}
                placeholder="e.g., Summarize in bullet points for executives"
              />
            </div>
            
            <div className="btn-container">
              <button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <FiLoader className="icon-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <FiCpu />
                    Generate Summary
                  </>
                )}
              </button>
            </div>
          </form>
        </section>

        {summary && (
          <section className="output-section">
            <div className="section-title">
              <FiEdit size={20} />
              <h2>Generated Summary</h2>
            </div>
            
            <form onSubmit={handleSendEmail}>
              <div className="form-group">
                <div className="preview-header">
                  <label htmlFor="summary-preview">Preview:</label>
                  <button 
                    type="button" 
                    className="edit-toggle-btn" 
                    onClick={toggleEditMode}
                    aria-label={isEditMode ? "Hide editor" : "Edit summary"}
                  >
                    {isEditMode ? (
                      <>
                        <FiEyeOff size={16} />
                        <span>Hide Editor</span>
                      </>
                    ) : (
                      <>
                        <FiEdit size={16} />
                        <span>Edit Summary</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="markdown-preview">
                  <ReactMarkdown>{summary}</ReactMarkdown>
                </div>
              </div>
              
              {isEditMode && (
                <div className="form-group edit-summary-container">
                  <label htmlFor="summary">Edit Summary:</label>
                  <textarea
                    id="summary"
                    value={summary}
                    onChange={handleSummaryChange}
                    rows="8"
                  />
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="recipients">
                  <FiMail size={16} style={{ marginRight: '5px', verticalAlign: 'middle' }} />
                  Recipient Emails (comma-separated):
                </label>
                <input
                  type="text"
                  id="recipients"
                  value={recipients}
                  onChange={handleRecipientsChange}
                  placeholder="email1@example.com, email2@example.com"
                  required
                />
              </div>
              
              <div className="btn-container">
                <button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <FiLoader className="icon-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend />
                      Send Email
                    </>
                  )}
                </button>
              </div>
            </form>
          </section>
        )}

        {error && (
          <div className="message error-message">
            <FiAlertCircle size={20} />
            {error}
          </div>
        )}
        
        {success && (
          <div className="message success-message">
            <FiCheckCircle size={20} />
            {success}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;