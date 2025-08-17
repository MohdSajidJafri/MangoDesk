/**
 * Validates if the input text is a proper meeting transcript
 * 
 * @param {string} text - The text to validate
 * @returns {object} - { isValid: boolean, reason: string }
 */
export const validateTranscript = (text) => {
  // Check if text is empty or too short
  if (!text || text.trim().length < 50) {
    return { 
      isValid: false, 
      reason: 'The transcript is too short. Please provide a complete meeting transcript.'
    };
  }

  // REQUIRED: Must have the "Name: text" pattern
  const speakerPattern = /\b\w+\s*[:]\s*\S+/;
  const hasNameColonPattern = speakerPattern.test(text);
  
  // Must have multiple speakers (at least 2 different people)
  const speakerMatches = text.match(/\b\w+\s*[:]/g) || [];
  const speakers = new Set(speakerMatches.map(s => s.replace(':', '').trim()));
  const hasMultipleSpeakers = speakers.size >= 2;
  
  // Must have conversational structure (multiple lines)
  const hasConversationalStructure = text.split('\n').length >= 3;
  
  // Check for JSON, code, or other non-transcript content
  const isJSON = text.trim().startsWith('{') && text.trim().endsWith('}');
  const isCode = /function|const|var|let|import|export|class|if\s*\(|for\s*\(|while\s*\(/.test(text);
  const containsBrackets = /{[\s\S]*}/.test(text) && /[{};]/.test(text);
  
  // If any of these critical checks fail, it's not a transcript
  if (!hasNameColonPattern) {
    return {
      isValid: false,
      reason: 'INVALID FORMAT: Meeting transcript must contain speakers followed by colons (e.g., "John: Hello everyone").'
    };
  }
  
  if (!hasMultipleSpeakers) {
    return {
      isValid: false,
      reason: 'INVALID FORMAT: Meeting transcript must contain at least 2 different speakers.'
    };
  }
  
  if (!hasConversationalStructure) {
    return {
      isValid: false,
      reason: 'INVALID FORMAT: Meeting transcript must have multiple lines of conversation.'
    };
  }
  
  if (isJSON || isCode || containsBrackets) {
    return {
      isValid: false,
      reason: 'INVALID CONTENT: The text appears to be code or JSON, not a meeting transcript.'
    };
  }
  
  // If we passed all critical checks, it's likely a valid transcript
  return { isValid: true };
};
