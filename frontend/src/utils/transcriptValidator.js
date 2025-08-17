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

  // Check for common meeting transcript patterns
  const hasNames = /\w+\s*[:]\s*\w+/i.test(text); // Looks for "Name: text" pattern
  const hasMultipleSpeakers = (text.match(/\w+\s*[:]/g) || []).length >= 2; // At least 2 different speakers
  const hasDateOrTime = /\b(meeting|call|date|time|minutes|agenda)\b/i.test(text);
  const hasConversationalStructure = text.split('\n').length >= 5; // At least 5 lines

  // Check for non-transcript content indicators
  const isCode = /{[\s\S]*}/.test(text) && /function|const|var|let|import|export|class/.test(text);
  const isArticle = text.length > 1000 && !hasNames && !hasMultipleSpeakers;
  const isRandomText = text.split(' ').length < 20;

  // Scoring system
  let score = 0;
  if (hasNames) score += 2;
  if (hasMultipleSpeakers) score += 3;
  if (hasDateOrTime) score += 1;
  if (hasConversationalStructure) score += 2;
  if (isCode) score -= 5;
  if (isArticle) score -= 3;
  if (isRandomText) score -= 2;

  // Decision
  if (score >= 3) {
    return { isValid: true };
  } else {
    return {
      isValid: false,
      reason: 'The text doesn\'t appear to be a meeting transcript. Please paste a proper meeting transcript with speakers and dialogue.'
    };
  }
};
