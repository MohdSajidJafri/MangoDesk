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
  const speakerPattern = /^[A-Za-z][A-Za-z0-9\s]*[:]/m;  // More lenient pattern that matches at line start
  const hasNameColonPattern = speakerPattern.test(text);
  
  // Must have multiple speakers (at least 2 different people)
  const speakerMatches = text.match(/^[A-Za-z][A-Za-z0-9\s]*[:]/gm) || [];
  const speakers = new Set(speakerMatches.map(s => s.replace(':', '').trim()));
  const hasMultipleSpeakers = speakers.size >= 2;
  
  // Must have conversational structure (multiple lines)
  const hasConversationalStructure = text.split('\n').length >= 3;
  
  // Check for JSON, code, or other non-transcript content
  const isJSON = text.trim().startsWith('{') && text.trim().endsWith('}');
  const isCode = /function|const|var|let|import|export|class|if\s*\(|for\s*\(|while\s*\(/.test(text);
  
  // Look for code-like structure (multiple brackets and semicolons)
  // This is a more nuanced check that won't reject transcripts that happen to contain a few brackets
  const codeLikeStructure = (text.match(/{/g) || []).length > 2 && 
                           (text.match(/}/g) || []).length > 2 && 
                           (text.match(/;/g) || []).length > 3;
  
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
  
  if (isJSON || isCode || codeLikeStructure) {
    return {
      isValid: false,
      reason: 'INVALID CONTENT: The text appears to be code or JSON, not a meeting transcript.'
    };
  }
  
  // If we passed all critical checks, it's likely a valid transcript
  return { isValid: true };
};
