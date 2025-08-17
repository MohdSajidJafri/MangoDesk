import React, { useState } from 'react';
import { 
  FiFileText, 
  FiCpu, 
  FiLoader,
  FiEdit,
  FiEyeOff,
  FiSend,
  FiMail
} from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';

const SummaryForm = ({ 
  transcript, 
  prompt, 
  summary, 
  recipients,
  loading,
  isEditMode,
  onTranscriptChange,
  onPromptChange,
  onSummaryChange,
  onRecipientsChange,
  onGenerateSummary,
  onSendEmail,
  toggleEditMode
}) => {
  return (
    <section className="form-section" id="create-summary">
      <div className="container">
        <h2 className="section-title">Create Your Summary</h2>
        <p className="section-description">
          Paste text, provide custom instructions, and let AI do the rest.
        </p>
        
        <div className="form-container">
          <div className="input-card">
            <div className="card-header">
              <FiFileText className="card-icon" />
              <h3>Input Meeting Transcript</h3>
            </div>
            <form onSubmit={onGenerateSummary}>
              <div className="form-group">
                <label htmlFor="transcript">
                  Meeting Transcript:
                </label>
                <textarea
                  id="transcript"
                  value={transcript}
                  onChange={onTranscriptChange}
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
                  onChange={onPromptChange}
                  placeholder="e.g., Summarize in bullet points for executives"
                />
              </div>
              
              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={loading}>
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
          </div>
          
          {summary && (
            <div className="output-card">
              <div className="card-header">
                <FiEdit className="card-icon" />
                <h3>Generated Summary</h3>
              </div>
              
              <form onSubmit={onSendEmail}>
                <div className="form-group">
                  <div className="preview-header">
                    <label htmlFor="summary-preview">Preview:</label>
                    <button 
                      type="button" 
                      className="btn btn-text" 
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
                      onChange={onSummaryChange}
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
                    onChange={onRecipientsChange}
                    placeholder="email1@example.com, email2@example.com"
                    required
                  />
                </div>
                
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
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
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SummaryForm;
