import React from 'react';
import { FiFileText, FiCpu, FiEdit } from 'react-icons/fi';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      icon: <FiFileText />,
      title: 'Paste Transcript & Instruct',
      description: 'Paste your meeting transcript text, then provide custom instructions for the AI.'
    },
    {
      number: 2,
      icon: <FiCpu />,
      title: 'AI Processing',
      description: 'Google Gemini AI analyzes your content and generates a tailored summary.'
    },
    {
      number: 3,
      icon: <FiEdit />,
      title: 'Edit & Share',
      description: 'Review, edit if needed, and share via email with professional formatting.'
    }
  ];

  return (
    <section className="how-it-works-section">
      <div className="container">
        <h2 className="section-title">How It Works</h2>
        
        <div className="steps-container">
          {steps.map((step) => (
            <div className="step-card" key={step.number}>
              <div className="step-number">{step.number}</div>
              <div className="step-content">
                <div className="step-icon">{step.icon}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
