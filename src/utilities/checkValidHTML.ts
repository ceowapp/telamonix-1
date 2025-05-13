/**
 * Checks if a string contains valid HTML.
 * @param {string} htmlString - The string to check.
 * @returns {boolean} - True if the string is valid HTML, false otherwise.
 */
export function checkValidHTML(htmlString) {
  // Handle empty or non-string input
  if (!htmlString || typeof htmlString !== 'string') {
    return false;
  }

  try {
    // Create a new DOMParser
    const parser = new DOMParser();
    
    // Parse the HTML string
    const doc = parser.parseFromString(htmlString, 'text/html');
    
    // Check if parsing created a parsererror element
    // This happens when the HTML is invalid
    const parserError = doc.querySelector('parsererror');
    
    if (parserError) {
      return false;
    }
    
    // Additional validation - check if the body contains at least one element
    // This catches cases where the string might be valid XML but not HTML
    const hasElements = doc.body.children.length > 0;
    
    return hasElements;
  } catch (error) {
    // If any error occurs during parsing, the HTML is invalid
    return false;
  }
}

