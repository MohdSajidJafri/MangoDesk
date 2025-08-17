import { useState } from 'react';
import './App.css';
import config from './config';
import ReactMarkdown from 'react-markdown';

function App() {
  const [transcript, setTranscript] = useState('');
  const [prompt, setPrompt] = useState('');
  const [summary, setSummary] = useState('');
  const [recipients, setRecipients] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
        <h1>Meeting Notes Summarizer</h1>
      </header>
      <main className="App-main">
        <section className="input-section">
          <h2>Input Meeting Transcript</h2>
          <form onSubmit={handleGenerateSummary}>
            <div className="form-group">
              <label htmlFor="transcript">Meeting Transcript:</label>
              <textarea
                id="transcript"
                value={transcript}
                onChange={handleTranscriptChange}
                placeholder="Paste your meeting transcript here..."
                rows="10"
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
            <button type="submit" disabled={loading}>
              {loading ? 'Generating...' : 'Generate Summary'}
            </button>
          </form>
        </section>

        {summary && (
          <section className="output-section">
            <h2>Generated Summary</h2>
            <form onSubmit={handleSendEmail}>
              <div className="form-group">
                <label htmlFor="summary">Edit Summary:</label>
                <div className="markdown-preview">
                  <ReactMarkdown>{summary}</ReactMarkdown>
                </div>
                <textarea
                  id="summary"
                  value={summary}
                  onChange={handleSummaryChange}
                  rows="10"
                />
              </div>
              <div className="form-group">
                <label htmlFor="recipients">Recipient Emails (comma-separated):</label>
                <input
                  type="text"
                  id="recipients"
                  value={recipients}
                  onChange={handleRecipientsChange}
                  placeholder="email1@example.com, email2@example.com"
                  required
                />
              </div>
              <button type="submit" disabled={loading}>
                {loading ? 'Sending...' : 'Send Email'}
              </button>
            </form>
          </section>
        )}

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
      </main>
    </div>
  );
}

export default App;