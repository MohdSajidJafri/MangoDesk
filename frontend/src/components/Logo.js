import React from 'react';
import { FiFileText } from 'react-icons/fi';

const Logo = () => {
  return (
    <div className="logo">
      <FiFileText className="logo-icon" />
      <span>Briefly(AI Meeting Summarizer)</span>
    </div>
  );
};

export default Logo;
