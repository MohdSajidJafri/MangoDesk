import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="app-footer">
      <div className="container">
        <p>
          © {currentYear} Briefly(AI Meeting Summarizer).
        </p>
        <p className="footer-note">
          Secure • Fast • Professional
        </p>
      </div>
    </footer>
  );
};

export default Footer;
