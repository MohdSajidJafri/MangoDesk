import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

const Hero = ({ onGetStarted }) => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-content">
          <h1>
            Transform Your Documents with <span className="highlight">AI-Powered</span> Summaries
          </h1>
          <p className="hero-description">
            Upload your meeting notes, transcripts, or documents and get intelligent
            summaries tailored to your needs. Share them instantly via email with
            professional formatting.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={onGetStarted}>
              Get Started <FiArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
