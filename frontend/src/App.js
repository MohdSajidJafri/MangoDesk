import { useState, useRef } from 'react';
import './App.css';
import config from './config';
import { validateTranscript } from './utils/transcriptValidator';

// Import components
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import SummaryForm from './components/SummaryForm';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';

function App() {
  const [transcript, setTranscript] = useState('');
  const [prompt, setPrompt] = useState('');
  const [summary, setSummary] = useState('');
  const [recipients, setRecipients] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  
  const formRef = useRef(null);

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

    // Validate if the input is a proper meeting transcript
    const validation = validateTranscript(transcript);
    if (!validation.isValid) {
      setError(validation.reason);
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

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app">
      <Header />
      
      <main className="main-content">
        <Hero onGetStarted={scrollToForm} />
        <Features />
        
        <div ref={formRef}>
          <SummaryForm
            transcript={transcript}
            prompt={prompt}
            summary={summary}
            recipients={recipients}
            loading={loading}
            isEditMode={isEditMode}
            onTranscriptChange={handleTranscriptChange}
            onPromptChange={handlePromptChange}
            onSummaryChange={handleSummaryChange}
            onRecipientsChange={handleRecipientsChange}
            onGenerateSummary={handleGenerateSummary}
            onSendEmail={handleSendEmail}
            toggleEditMode={toggleEditMode}
          />
        </div>
        
        <HowItWorks />
        
        {error && (
          <div className="notification error-notification">
            <p><strong>⚠️ Error:</strong> {error}</p>
            <button className="close-btn" onClick={() => setError('')}>×</button>
          </div>
        )}
        
        {success && (
          <div className="notification success-notification">
            <p>{success}</p>
            <button className="close-btn" onClick={() => setSuccess('')}>×</button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;