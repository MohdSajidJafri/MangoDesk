import React from 'react';
import { FiCpu, FiShield, FiMail } from 'react-icons/fi';

const Features = () => {
  const features = [
    {
      icon: <FiCpu />,
      title: 'AI-Powered Summarization',
      description: 'Advanced Google Gemini AI analyzes your content and creates intelligent summaries based on your custom instructions.'
    },
    {
      icon: <FiShield />,
      title: 'Secure & Private',
      description: 'Your data is processed with privacy and security in mind. No data is stored longer than necessary.'
    },
    {
      icon: <FiMail />,
      title: 'Email Integration',
      description: 'Easily share your summaries via email with professional formatting directly via email with customizable recipients.'
    }
  ];

  return (
    <section className="features-section">
      <div className="container">
        <h2 className="section-title">Powerful Features for Modern Workflows</h2>
        <p className="section-description">
          Everything you need to process, edit, and share document summaries efficiently.
        </p>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
