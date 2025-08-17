/**
 * Simple validator that only rejects the most obvious non-transcript formats
 * 
 * @param {string} text - The text to validate
 * @returns {object} - { isValid: boolean, reason: string }
 */
export const validateTranscript = (text) => {
  // Check if text is empty
  if (!text || text.trim().length === 0) {
    return { 
      isValid: false, 
      reason: 'Please provide a transcript.'
    };
  }

  // Very basic check for JSON
  try {
    // If this succeeds, it's likely JSON
    if (text.trim().startsWith('{') && text.trim().endsWith('}')) {
      JSON.parse(text);
      return {
        isValid: false,
        reason: 'The input appears to be JSON data, not a meeting transcript.'
      };
    }
  } catch (e) {
    // Not valid JSON, which is good
  }
  
  // Very basic check for code snippets
  const codePatterns = [
    /function\s+\w+\s*\(/i,
    /const|let|var\s+\w+\s*=/i,
    /import\s+.*\s+from/i,
    /export\s+(default\s+)?(class|function|const)/i,
    /<\/?[a-z]+[^>]*>/i  // HTML tags
  ];
  
  for (const pattern of codePatterns) {
    if (pattern.test(text)) {
      return {
        isValid: false,
        reason: 'The input appears to be code, not a meeting transcript.'
      };
    }
  }
  
  // Check if it's just a single paragraph with no dialogue structure
  const hasColons = text.includes(':');
  const hasMultipleLines = text.split('\n').filter(line => line.trim()).length > 2;
  
  if (!hasColons) {
    return {
      isValid: false,
      reason: 'The input doesn\'t appear to contain dialogue (no speaker names with colons found).'
    };
  }
  
  if (!hasMultipleLines) {
    return {
      isValid: false,
      reason: 'The input appears to be a single paragraph, not a conversation transcript.'
    };
  }
  
  // If we passed these basic checks, accept the input
  return { isValid: true };
};
